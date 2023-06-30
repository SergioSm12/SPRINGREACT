import React from "react";
import PropTypes from "prop-types";
import { Title } from "./components/Title";
import { UserDetails } from "./components/UserDetails";
import { Book } from "./components/Book";

export const HelloWorldApp = ({ user, id, title, book }) => {
  const name = "Pepe";
  console.log(title);
  return (
    <>
      <Title title="Hola Mundo" />
      <UserDetails user={user} id={id}/>
      <Book book={book}/>
    </>
  );
};

//Configuracion de prop types
HelloWorldApp.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.object,
};
//Configurar Prop types para valores por defecto

HelloWorldApp.defaultProps = {
  title: "Hola mundo por defecto!",
  book: "UML got a gota",
};
