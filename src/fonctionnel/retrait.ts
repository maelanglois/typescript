import prompts from "prompts";
import { connect } from "./connect";
import { CLI } from "../CLI";


let solde = 0;

export async function retrait(choice: CLI){
    const retrait = await prompts({
      type: "number",
      name: "value",
      message:"Combien d'argent voulez-vous retirer ?",
      validate: (value) => (Number.isInteger(value) && value > 0 ? true : "Vous devez retirer un montant supérieur à 0.")
    })
    solde -= retrait.value;
    console.log("Votre nouveau solde est de " + solde);
    connect(choice);
   }