import React, { Fragment } from 'react';
import Loader from 'shared/components/Loader';
import { Forward } from '@material-ui/icons';
import { SubmitButton } from './Styles';

const Submit = ({ loading }) => (
  <SubmitButton disabled={loading} className="btn waves-effect waves-light" type="submit">
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        Login
        <Forward style={{ marginLeft: 12 }} />
      </Fragment>
    )}
  </SubmitButton>
);

export default Submit;
