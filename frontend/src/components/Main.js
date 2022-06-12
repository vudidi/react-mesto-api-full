import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          onClick={props.onEditAvatar}
          className="profile__image"
          style={{
            backgroundImage: `url(${currentUser.avatar})`,
          }}
        ></div>
        <div className="profile__text">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onEditProfile}
          className="profile__button-edit"
          type="button"
        ></button>
        <button
          onClick={props.onAddPlace}
          className="profile__button-add"
          type="button"
        ></button>
      </section>

      <ul className="cards">
        {props.cards.map((item) => {
          return (
            <Card
              card={item}
              onImageClick={props.onCardClick}
              onCardLike={() => {
                props.onCardLike(item);
              }}
              onCardDelete={() => {
                props.onCardDelete(item);
              }}
              key={item._id}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
