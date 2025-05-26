const ApiError = require('../../classes/api.error');
const {generateUUID} = require('../../utils/generators');

class MedicationService {
  constructor(medicationRepository) {
    this.medicationRepository = medicationRepository;
  }

  async getAllUserMedications(userId) {
    return this.medicationRepository.findMedicationsByUserId(userId);
  }

  async getMedicationById(medicationId) {
    const medication = await this.medicationRepository.findMedicationById(medicationId);
    if (!medication) {
      throw ApiError.NotFound('Medication not found');
    }

    return medication;
  }

  async createMedication(userId, {
    name, description, initialAmount, targetAmount,
  }) {
    const medicationId = generateUUID();
    const now = Date.now();

    const medicationTO = {
      id: medicationId,
      userId,
      name,
      description,
      initialAmount,
      targetAmount,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    };

    await this.medicationRepository.createMedication(medicationTO);
    return medicationTO;
  }

  async deleteMedicationById(userId, medicationId) {
    const medication = await this.medicationRepository.findMedicationById(medicationId);

    if (!medication || medication.userId !== userId) {
      throw ApiError.Forbidden('You are not allowed to delete this medication');
    }

    await this.medicationRepository.deleteMedicationById(medicationId);
  }

  async updateMedication(userId, medicationId, data) {
    const existing = await this.medicationRepository.findMedicationById(medicationId);

    if (!existing) {
      throw ApiError.NotFound('Medication not found');
    }

    if (existing.userId !== userId) {
      throw ApiError.Forbidden('You are not allowed to update this medication');
    }

    const updatedAt = Date.now();

    const updatedMedication = {
      ...existing,
      ...data,
      updatedAt,
      updatedBy: userId,
    };

    await this.medicationRepository.updateMedication(medicationId, updatedMedication);

    return updatedMedication;
  }
}

module.exports = MedicationService;
