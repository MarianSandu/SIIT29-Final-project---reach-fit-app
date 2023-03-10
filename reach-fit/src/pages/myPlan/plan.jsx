import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "./plan.css";
import { ShowWorkouts } from "./ShowWorkouts";

export function MyPlan() {
  return (
    <section>
      <HeaderComponent />

      <h1 className="plan-title">My Plan</h1>

      <ShowWorkouts />

      <FooterComponent />
    </section>
  );
}
