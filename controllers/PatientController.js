// Import Model Patient
const Patients = require("../models/Patient");

// Buat class PatientController
class PatientController {
    async index(req, res) {
        try {
            const patients = await Patients.all();

            if (patients && patients.length > 0) {
                const data = {
                    message: "The request succeeded",
                    data: patients
                };

                return res.status(200).json(data);
            } else {
                const data = {
                    message: "Menampilkan data Patients",
                };

                return res.status(200).json(data);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async store(req, res) {
        const patient = await Patients.create(req.body);
        const data = {
            message: "Menambahkan data patient",
            data: patient,
        };

        res.status(201).json(data);
    }

    async update(req, res) {
        const { id } = req.params;

        const patient = await Patients.find(id);

        if (patient) {
            // Update data
            const patientUpdated = await Patients.update(id, req.body);
            const data = {
                message: "Mengupdate data pasien",
                data: patientUpdated,
            };

            res.status(200).json(data);
        } else {
            // Kirim data tidak ada
            const data = {
                message: "Data tidak ada",
            };

            res.status(404).json(data);
        }
    }

    async destroy(req, res) {
        const { id } = req.params;

        const patient = await Patients.find(id);

        if (patient) {
            // Hapus data
            await Patients.delete(id);
            const data = {
                message: "Menghapus data pasien",
            };

            res.status(200).json(data);
        } else {
            // Data tidak ada
            const data = {
                message: "Data tidak ada",
            };

            res.status(404).json(data);
        }
    }

    async show(req, res) {
        const { id } = req.params;

        const patient = await Patients.find(id);

        if (patient) {
            const data = {
                message: "Menampilkan detail data pasien",
                data: patient,
            };

            res.status(200).json(data);
        } else {
            const data = {
                message: "Data tidak ada",
            };

            res.status(404).json(data);
        }
    }

    async search(req, res) {
      try {
          const { keyword } = req.params;
          const searchResult = await Patients.search(keyword);

          if (searchResult && searchResult.length > 0) {
              const data = {
                  message: "Search result found",
                  data: searchResult
              };

              return res.status(200).json(data);
          } else {
              const data = {
                  message: "No matching result found",
              };

              return res.status(404).json(data);
          }
      } catch (error) {
          console.error("Error searching patients:", error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }

  async getPositiveResource(req, res) {
      try {
          const positivePatients = await Patients.getPositiveResource();

          const data = {
              message: "Positive resource data",
              data: positivePatients
          };

          res.status(200).json(data);
      } catch (error) {
          console.error("Error fetching positive resource data:", error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }

  async getRecoveredResource(req, res) {
      try {
          const recoveredPatients = await Patients.getRecoveredResource();

          const data = {
              message: "Recovered resource data",
              data: recoveredPatients
          };

          res.status(200).json(data);
      } catch (error) {
          console.error("Error fetching recovered resource data:", error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }

  async getDeadResource(req, res) {
      try {
          const deadPatients = await Patients.getDeadResource();

          const data = {
              message: "Dead resource data",
              data: deadPatients
          };

          res.status(200).json(data);
      } catch (error) {
          console.error("Error fetching dead resource data:", error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }
}

// Membuat object PatientController
const object = new PatientController();

// Export object PatientController
module.exports = object;
