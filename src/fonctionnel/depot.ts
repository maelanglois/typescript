import prompts from "prompts";

import { connect } from "./connect";

export async function depot() {
    const deposer = await prompts({
      type: "number",
      name: "value",
      message: "Combien d'argent voulez-vous déposer ?",
      validate: (value) => (Number.isInteger(value) && value > 0 ? true : "Vous devez déposer un montant supérieur à 0.")
    })
    solde += deposer.value;
    console.log("Votre nouveau solde est de " + solde);
    connect();
   }