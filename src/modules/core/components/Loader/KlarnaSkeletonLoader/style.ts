import styled from 'styled-components';

export const StyledDiv = styled.div`
  #skeleton-loader {
    display: flex;
    justify-content: center;
    background-color: ${(props) =>
      props.theme.invert ? props.theme.contrastColor : props.theme.themeColor};

    .skeleton {
      max-width: 640px;
      width: 100%;
      box-sizing: border-box;
      flex-direction: column;
      padding: 15px;

      .sectionTitle {
        margin-bottom: 15px;
        width: 130px;
        height: 18px;
      }

      .autoFill {
        width: 30%;
        height: 10px;
        margin: 20px 0 auto;
      }

      .addressContent {
        width: 100%;
        height: 135px;
      }

      .continueButton {
        width: 50%;
        height: 50px;
        margin-top: 20px;
        margin-left: auto;
      }

      .footer {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        padding: 0 15px;

        .cartTitle {
          width: 90%;
          height: 12px;
        }

        .price {
          width: 10%;
          height: 15px;
          margin: 15px 0 20px 0;
        }

        .buyButton {
          height: 50px;
          width: 60%;
          margin-bottom: 15px;
        }

        .adTitle {
          width: 95%;
          height: 12px;
        }
      }

      .adTitle,
      .addressContent,
      .autoFill,
      .buyButton,
      .cartTitle,
      .continueButton,
      .price,
      .sectionTitle {
        border-radius: 10px;
        display: block;
        background: linear-gradient(
          45deg,
          #e9e9e8 33%,
          #d0cecb 45%,
          #e9e9e8 65%
        );
        background-size: 800px;
        -webkit-animation: skeleton-animation 1.5s infinite linear;
        animation: skeleton-animation 1.5s infinite linear;
      }

      .addressContent,
      .buyButton,
      .continueButton {
        border-radius: 3px;
      }
    }
  }

  @-webkit-keyframes skeleton-animation {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
  @keyframes skeleton-animation {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;
