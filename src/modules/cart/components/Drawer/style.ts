import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: relative;

  .loader-conatiner {
    position: relative;
    height: 20vh;
  }

  .clear-loader {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(48 51 45 / 10%);
    z-index: 100;
  }
`;
