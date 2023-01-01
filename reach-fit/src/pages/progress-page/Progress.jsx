import { HeaderComponent } from "../reusables/HeaderComponent";
import { FooterComponent } from "../reusables/FooterComponent";
import "./Progress.css";

export function Progress() {
  return (
    <section>
      <HeaderComponent />

      <h1 className="progress-title">Progress</h1>

      <FooterComponent />
    </section>
  );
}
