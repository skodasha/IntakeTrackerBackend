const BaseController = require('../../classes/base.controller');
const sessionValidationMiddleware = require('../../middlewares/session-validation.middleware');
const requestValidationMiddleware = require('../../middlewares/request-validation.middleware');
const {medicationSchema} = require('../../validators/medication.validator');

class MedicationController extends BaseController {
  constructor(medicationService, userService) {
    super();

    this.medicationService = medicationService;
    this.userService = userService;

    this.getAllMedications = this.getAllMedications.bind(this);
    this.getMedicationById = this.getMedicationById.bind(this);
    this.createMedication = this.createMedication.bind(this);
    this.updateMedication = this.updateMedication.bind(this);
    this.deleteMedication = this.deleteMedication.bind(this);

    this.router.get(
      '/all',
      sessionValidationMiddleware(userService),
      this.getAllMedications,
    );

    this.router.get(
      '/:medicationId',
      sessionValidationMiddleware(userService),
      this.getMedicationById,
    );

    this.router.post(
      '/create',
      sessionValidationMiddleware(userService),
      requestValidationMiddleware(medicationSchema),
      this.createMedication,
    );

    this.router.put(
      '/update/:medicationId',
      sessionValidationMiddleware(userService),
      requestValidationMiddleware(medicationSchema),
      this.updateMedication,
    );

    this.router.delete(
      '/delete/:medicationId',
      sessionValidationMiddleware(userService),
      this.deleteMedication,
    );
  }

  async getAllMedications(req, res, next) {
    try {
      const {user} = req;
      const medicationsData = await this.medicationService.getAllUserMedications(user.id);

      return res.status(200).json(medicationsData);
    } catch (e) {
      return next(e);
    }
  }

  async getMedicationById(req, res, next) {
    try {
      const {medicationId} = req.params;
      const medication = await this.medicationService.getMedicationById(medicationId);
      return res.status(200).json(medication);
    } catch (error) {
      return next(error);
    }
  }

  async createMedication(req, res, next) {
    try {
      const {user} = req;
      const {
        name, description, initialAmount, targetAmount,
      } = req.body;

      const medication = await this.medicationService.createMedication(user.id, {
        name,
        description,
        initialAmount,
        targetAmount,
      });

      return res.status(201).json(medication);
    } catch (e) {
      return next(e);
    }
  }

  async updateMedication(req, res, next) {
    try {
      const {user} = req;
      const {medicationId} = req.params;
      const {
        name, description, initialAmount, targetAmount,
      } = req.body;

      const updatedMedication = await this.medicationService.updateMedication(user.id, medicationId, {
        name,
        description,
        initialAmount,
        targetAmount,
      });

      return res.status(200).json(updatedMedication);
    } catch (e) {
      return next(e);
    }
  }

  async deleteMedication(req, res, next) {
    try {
      const {user} = req;
      const {medicationId} = req.params;
      await this.medicationService.deleteMedicationById(user.id, medicationId);
      return res.status(204).send();
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = MedicationController;
