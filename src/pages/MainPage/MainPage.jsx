import { useState } from 'react';
import Banner from '../../components/Banner';
import Introduce from '../../components/Introduce'
import RankingRow from '../../components/RankingRow';
import VegetarianRow from '../../components/VegetarianRow';
import GlutenFreeRow from '../../components/GlutenFreeRow';
import YoutubeModal from '../../components/modals/YoutubeModal'

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState('');

  const handleSlideClick = (videoId) => {
    setModalVisible(true);
    setYoutubeVideoId(videoId);
  };

  const handleCloseButtonClick = () => {
    setModalVisible(false);
    setYoutubeVideoId('');
  };

  return (
    <div>
        <Banner handleSlideClick={handleSlideClick}/> 
        <Introduce />
        <RankingRow />
        <VegetarianRow />
        <GlutenFreeRow />
        {modalVisible && (
          <YoutubeModal videoId = {youtubeVideoId} onCloseButtonClick={handleCloseButtonClick}/> 
          ) }
    </div>
  );
}