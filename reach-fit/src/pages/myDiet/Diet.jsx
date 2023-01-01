import { HeaderComponent } from "../reusables/HeaderComponent";
import { FooterComponent } from "../reusables/FooterComponent";
import "./Diet.css";

export function MyDiet() {
  return (
    <section>
      <HeaderComponent />

      <h1 className="diet-title">My Diet</h1>

      <FooterComponent />
    </section>
  );
}
