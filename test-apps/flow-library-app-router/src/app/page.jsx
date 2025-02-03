/**
 * This is the main page of the application.
 * @file File is saved as src/app/page.jsx.
 */
import HomeClient from '../components/organisms/HomeClient';
/**
 * This is the main page of the application.
 * @returns {JSX.Element} The main page of the application.
 * @example
 * <HomePage />
 */
function Home() {
  return (
    <div>
      Home
      <HomeClient />
    </div>
  );
}

export default Home;
