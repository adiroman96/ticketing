import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);// browser vs server
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    // force the getInitaialProps of a child component
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  // sending geinitialProps of the child component to the child & 
  // currentuser {}
  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
