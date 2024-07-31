import { FC } from 'react';

import { Typography, CircularProgress } from '@mui/material';
import { operatorAPI, operatorAddonAPI } from '../../services';
import { TableView } from '../TableView';
import { useOperatorsController } from '../../hooks';

export const Table: FC = () => {
  const {
    data: operators = [],
    isLoading: isLoadingOperators,
    error: isErrorOperators
  } = operatorAPI.useFetchAllOperatorsQuery('');

  const {
    data: operatorAddons = [],
    isLoading: isLoadingOperatorAddons,
    error: isErrorOperatorAddons
  } = operatorAddonAPI.useFetchAllAddonsQuery('');

  const { finalOperators, filteredOperatorsCount, ...rest } = useOperatorsController({
    operators,
    operatorAddons
  });

  if (isLoadingOperators || isLoadingOperatorAddons) {
    return <CircularProgress />;
  }

  if (isErrorOperators || isErrorOperatorAddons) {
    return <Typography variant="h1">Error!</Typography>;
  }

  return (
    <TableView operators={finalOperators} allOperatorsCount={filteredOperatorsCount} {...rest} />
  );
};
