import prompts from "prompts";
import { CLI } from "../CLI";

import { connect } from "./connect";
import { getUser } from "../models/Connected";

export async function depot(choice: CLI) {
    const user = getUser();
    const deposer = await prompts({
      type: "number",
      name: "value",
      message: "Combien d'argent voulez-vous déposer ?",
      validate: (value) => (Number.isInteger(value) && value > 0 ? true : "Vous devez déposer un montant supérieur à 0.")
    })
    user.solde += deposer.value;
    console.log("Votre nouveau solde est de " + user.solde);
    connect(choice);
   }