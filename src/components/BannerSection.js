import styled from 'styled-components';

const Section = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

const BannerSection = styled(Section)`
  background-color: white;
  background-size: cover;
  
  div.ui.text.container {
    padding-top: 10%;
  }

  div.btn-container {
    display: flex;
    justify-content: space-between;

    button {
      width: 50%;
    }
  }

  div.ui.input {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 4rem;
    }

    h2.ui.header {
      margin-bottom: 30px;
      margin-top: 0;
      font-size: 2rem;
    }
  }

  textarea {
    width: 100%;
  }
`;

export default BannerSection;