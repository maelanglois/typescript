import prompts from "prompts";
import { CLI } from "../CLI";

import { connect } from "./connect";
import { getUser } from "../models/Connected";

export async function depot(choice: CLI) {
    const user = getUser();
    const deposer = await prompts({
      type: "number",
      name: "depot",
      message: "Combien d'argent voulez-vous déposer ?",
      validate: (depot) => (Number.isInteger(depot) && depot > 0 ? true : "Vous devez déposer un montant supérieur à 0.")
    })
    user.solde += deposer.depot;
    console.log("Votre nouveau solde est de " + user.solde);
    connect(choice);
   }