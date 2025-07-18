import MainCardContent from './Content';
import MainCardImage from './Image';
import MainCardRoot from './MainCardRoot';

const MainCard = Object.assign(MainCardRoot, {
  Image: MainCardImage,
  Content: MainCardContent,
});

export default MainCard;
