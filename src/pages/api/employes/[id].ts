import { NextApiRequest, NextApiResponse } from "next";

// Simulated database (replace with your actual database logic)
const employes = [
  { id: 1, numEmp: "001", nom: "John Doe", nombre_de_jours: 10, taux_journalier: 100 },
  { id: 2, numEmp: "002", nom: "Jane Smith", nombre_de_jours: 15, taux_journalier: 120 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const updatedEmploye = req.body;

    // Find the employee by ID
    const employeIndex = employes.findIndex((emp) => emp.id === parseInt(id as string, 10));
    if (employeIndex === -1) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Update the employee
    employes[employeIndex] = { ...employes[employeIndex], ...updatedEmploye };

    return res.status(200).json(employes[employeIndex]);
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
