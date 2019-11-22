import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import  { GlobalStyle } from './global.styles';

import { checkUsersSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.comonent';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

const App = ({ checkUsersSession,  currentUser }) => {  

    useEffect(() => {
      checkUsersSession();
    }, [checkUsersSession]);

    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                  <Route exact path='/' component={ HomePage } />
                  <Route path='/shop' component={ ShopPage } />
                  <Route exact path='/checkout' component={CheckoutPage} />
                  <Route 
                      exact 
                      path='/signin' 
                      render={() => 
                          currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage />)
                        }
                  />
              </Suspense>
          </ErrorBoundary>   
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
 
const mapDispatchToProps = dispatch => ({
  checkUsersSession: () => dispatch(checkUsersSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);