import React from "react";
import styled from "styled-components";
import { ClassRecords } from "../store/slices";

const Card = ({ name, students }: ClassRecords["classes"][0]) => {
  return (
    <CardStyle>
      <div className={"CardStyle__info"}>
        <h4>Name</h4>
        <p>{name}</p>
      </div>
      <div className={"CardStyle__info"}>
        <h4>Students</h4>
        {students.join(", ")}
      </div>
    </CardStyle>
  );
};

const CardStyle = styled.div`
  border: 1px solid;
  padding: 10px;
  max-width: 500px;
  min-width: 300px;
  border-radius: 5px;
  margin: auto auto 20px;

  .CardStyle {
    &__info {
      margin-bottom: 15px;
    }
  }
`;

export default Card;
