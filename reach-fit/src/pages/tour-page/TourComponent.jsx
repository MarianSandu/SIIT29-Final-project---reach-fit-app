import "./TourComponent.css";

export function TourComponent() {
  return (
    <main className="main-tour-container">
      <h1 className="main-header">Reaching your goals just became easier</h1>

      <section className="types-section section">
        <h2 className="section-title">Wide variety of workouts</h2>

        <ul className="types-container">
          <li>
            <img
              src="\images\Indoor workout medium.jpg"
              alt="Workout type"
              className="card-image"
            />
            <div className="types-text-container">
              <h3>At home</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quaerat facere expedita suscipit id el. ipisicing elit. Quaerat
                facere expedita suscipit id el.
              </p>
            </div>
          </li>

          <li>
            <img
              src="\images\workout.jpg"
              alt="Workout type"
              className="card-image"
            />
            <div className="types-text-container">
              <h3>At the gym</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quaerat facere expedita suscipit id el. ipisicing elit. Quaerat
                facere expedita suscipit id el.
              </p>
            </div>
          </li>

          <li>
            <img
              src="\images\Yoga workouts medium.jpg"
              alt="Workout type"
              className="card-image"
            />
            <div className="types-text-container">
              <h3>Yoga</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quaerat facere expedita suscipit id el. ipisicing elit. Quaerat
                facere expedita suscipit id el.
              </p>
            </div>
          </li>

          <li>
            <img
              src="\images\Bodyweight workout medium.jpg"
              alt="Workout type"
              className="card-image"
            />
            <div className="types-text-container">
              <h3>Body weight</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quaerat facere expedita suscipit id el. ipisicing elit. Quaerat
                facere expedita suscipit id el.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="level-section section">
        <h2 className="section-title">
          For everybody, no matter your fitness level
        </h2>

        <div className="levels-container">
          <div className="beginner level">
            <img
              src="/images/Beginner.jpg"
              alt="Fitness level"
              className="level-img beginner-img"
            />
            <p className="level-title">Beginner</p>
          </div>

          <div className="intermediate level">
            <img
              src="/images/Intermediate.jpg"
              alt="Fitness level"
              className="level-img intermediate-img"
            />
            <p className="level-title">Intermediate</p>
          </div>

          <div className="advanced level">
            <img
              src="/images/Advanced (pro).jpg"
              alt="Fitness level"
              className="level-img advanced-img"
            />
            <p className="level-title">Advanced</p>
          </div>
        </div>
      </section>

      <section className="goal-section section">
        <h2 className="section-title">No matter the goals you want to reach</h2>

        <ul className="goals-container">
          <li className="goal-item">
            <img
              src="/images/Lose weight medium.jpg"
              alt="Goal to set"
              className="goal-img"
            />
            <h3 className="goal-title">Lose weight</h3>
          </li>

          <li className="goal-item second-item">
            <img
              src="/images/Athletic medium.jpg"
              alt="Goal to set"
              className="goal-img"
            />
            <h3 className="goal-title">Get shredded</h3>
          </li>

          <li className="goal-item third-item">
            <img
              src="/images/Pumped up medium.jpg"
              alt="Goal to set"
              className="goal-img"
            />
            <h3 className="goal-title">Get bulk</h3>
          </li>

          <li className="goal-item fourth-item">
            <img
              src="/images/Abs image medium.jpg"
              alt="Goal to set"
              className="goal-img"
            />
            <h3 className="goal-title">Get insane abs</h3>
          </li>
        </ul>
      </section>

      <section className="trainers-section section">
        <h2 className="section-title">Our trainers are here for you</h2>

        <ul className="trainers-container">
          <li className="trainers-item">
            <img
              src="/images/Trainers1.jpg"
              alt="Trainer"
              className="trainers-img"
            />
            <p className="trainer-1">@robertSy</p>
          </li>

          <li className="trainers-item">
            <img
              src="/images/Trainers4.jpg"
              alt="Trainer"
              className="trainers-img"
            />
            <p className="trainer-2">@P_Ashley</p>
          </li>

          <li className="trainers-item">
            <img
              src="/images/Trainers3.jpg"
              alt="Trainer"
              className="trainers-img"
            />
            <p className="trainer-3">@vanessa</p>
          </li>

          <li className="trainers-item">
            <img
              src="/images/Trainers2.jpg"
              alt="Trainer"
              className="trainers-img"
            />
            <p>@mikeSup</p>
          </li>

          <li className="trainers-item">
            <img
              src="/images/Trainers5.jpg"
              alt="Trainer"
              className="trainers-img"
            />
            <p>@ridley</p>
          </li>
        </ul>
      </section>

      <section className="diets-section section">
        <h2 className="section-title">Our recipes fit your diet</h2>

        <ul className="diets-container">
          <li className="diet-item">
            <img src="/images/Keto good.jpg" alt="Diet" />
            <p>Keto</p>
          </li>

          <li className="diet-item">
            <img src="/images/Mediterranean diet.jpg" alt="Diet" />
            <p>Mediterranean</p>
          </li>

          <li className="diet-item">
            <img src="/images/Vegetarian.jpg" alt="Diet" />
            <p>Vegetarian</p>
          </li>

          <li className="diet-item">
            <img src="/images/Pescatarian diet.jpg" alt="Diet" />
            <p>Pescatarian</p>
          </li>

          <li className="diet-item">
            <img src="/images/Vegan good.jpg" alt="Diet" />
            <p>Vegan</p>
          </li>

          <li className="diet-item">
            <img src="/images/Paleo good.jpg" alt="Diet" />
            <p>Paleo</p>
          </li>
        </ul>
      </section>

      <section className="devices-section section">
        <h2 className="section-title">
          And we are with you on all the devices
        </h2>
      </section>
    </main>
  );
}
