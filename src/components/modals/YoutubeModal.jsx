import React from 'react';
import styled from 'styled-components';

const YoutubeModal = (props) => { 
    const {
      onCloseButtonClick,
        videoId
    } = props;
    return (
        <Container>
          <HomeContainer>
            <CloseButton onClick={onCloseButtonClick}>x</CloseButton>
            <Iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay"
            ></Iframe>
          </HomeContainer>
        </Container>
    );
};

export default YoutubeModal;

const CloseButton = styled.button`
  position: absolute;
  top: 70px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background: none;
  border: none;
  color: white;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 4;
`;

const HomeContainer = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
  overflow: hidden;
`;