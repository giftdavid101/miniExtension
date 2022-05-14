import React from "react";
import styled from "styled-components";
import Card from "../card";
import { ClassRecords, loginActions } from "../../store/slices";
import { useAppDispatch } from "../../store";

const ResultPage = ({ classes }: { classes: ClassRecords["classes"] }) => {
  const dispatch = useAppDispatch();

  return (
    <Styling>
      <div>
        <button onClick={() => dispatch(loginActions.logout())}>logout</button>
      </div>
      <div>
        {classes.map((el) => (
          <Card {...el} key={el.name} />
        ))}
      </div>
    </Styling>
  );
};

const Styling = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;

  > div:nth-child(2) {
    margin: auto;
  }
`;

export default ResultPage;
