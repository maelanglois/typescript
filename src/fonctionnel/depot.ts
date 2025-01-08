import prompts from "prompts";
import { CLI } from "../CLI";

import { connect } from "./connect";

let solde = 0;

export async function depot(choice: CLI) {
    const deposer = await prompts({
      type: "number",
      name: "value",
      message: "Combien d'argent voulez-vous déposer ?",
      validate: (value) => (Number.isInteger(value) && value > 0 ? true : "Vous devez déposer un montant supérieur à 0.")
    })
    solde += deposer.value;
    console.log("Votre nouveau solde est de " + solde);
    connect(choice);
   }