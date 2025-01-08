import prompts from "prompts";
import { retrait } from "./retrait";
import { depot } from "./depot";
import { solde } from "./solde";
import { history } from "./history";
import { CLI } from "../CLI";

export async function connect(choice: CLI) {
  const response = await prompts({
    type: "select",
    name: "value",
    message: "Quelle action voulez-vous faire ?",
    choices: [
      { title: "Déposer de l'argent", value: "depot" },
      { title: "Retirer de l'argent", value: "retrait" },
      { title: "Voir l'historique", value: "historique" },
      { title: "Voir le solde", value: "solde" },
      { title: "Quitter", value: "quitter" },
    ],
  });

  switch (response.value) {
    case "depot":
      await depot(choice);
      break;
    case "retrait":
      await retrait(choice);
      break;
    case "historique":
      await history(choice);
      break;
    case "solde":
      await solde(choice);
      break;
    case "quitter":
      await choice.quit();
      break;
  }
}

 