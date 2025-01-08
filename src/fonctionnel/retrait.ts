import prompts from "prompts";
import { connect } from "./connect";
import { CLI } from "../CLI";
import { getUser } from "../models/Connected";

export async function retrait(choice: CLI){
    const user = getUser();
    const retirer = await prompts({
      type: "number",
      name: "retrait",
      message:"Combien d'argent voulez-vous retirer ?",
      validate: (retrait) => (Number.isInteger(retrait) && retrait > 0 ? true : "Vous devez retirer un montant supérieur à 0.")
    })
    user.solde -= retirer.retrait;
    console.log("Votre nouveau solde est de " + user.solde);
    connect(choice);
   }