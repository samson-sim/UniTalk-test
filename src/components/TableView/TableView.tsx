import { FC } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField
} from '@mui/material';

import type { Operator } from '../../models';
import { format } from 'date-fns';
import { get } from 'lodash';

interface TableViewProps {
  operators: Operator[];
  operatorAddonFields: string[];
  allOperatorsCount: number;
  filter: string;
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  sortBy: string | null;
  onChangeFilter: (value: string) => void;
  onChangeSort: (value: string) => void;
  onChangePage: (value: number) => void;
  onChangePerPage: (value: number) => void;
}

const PAGINATION_CHOICES = [5, 10, 15, 25];

export const TableView: FC<TableViewProps> = (props) => {
  const {
    operators,
    allOperatorsCount,
    filter,
    page,
    perPage,
    order,
    sortBy,
    onChangeFilter,
    onChangeSort,
    onChangePage,
    onChangePerPage,
    operatorAddonFields
  } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 1200 }}>
      <TextField
        label="Filter"
        fullWidth
        value={filter}
        onChange={(e) => onChangeFilter(e.target.value)}
      />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Аватар</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'isWorking'}
                    direction={sortBy === 'isWorking' ? order : 'asc'}
                    onClick={() => onChangeSort('isWorking')}
                  >
                    Працює
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'createdAt'}
                    direction={sortBy === 'createdAt' ? order : 'asc'}
                    onClick={() => onChangeSort('createdAt')}
                  >
                    Дата доєднання
                  </TableSortLabel>
                </TableCell>
                {operatorAddonFields.map((addon) => (
                  <TableCell key={addon}>
                    <TableSortLabel
                      active={sortBy === addon}
                      direction={sortBy === addon ? order : 'asc'}
                      onClick={() => onChangeSort(addon)}
                    >
                      {addon}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {operators.map((operator, index) => (
                <TableRow key={operator.id}>
                  <TableCell>{index + 1 + page * perPage}</TableCell>
                  <TableCell>
                    <Avatar src={operator.avatar} alt={operator.name} />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={operator.isWorking} disabled />
                  </TableCell>
                  <TableCell>{format(operator.createdAt, 'dd.MM.yyyy HH:mm')}</TableCell>

                  {operatorAddonFields.map((addon) => {
                    const addonValue = get(operator, addon, '');

                    return (
                      <TableCell key={addon}>
                        {typeof addonValue === 'boolean' ? (
                          <Checkbox checked={addonValue} disabled />
                        ) : (
                          addonValue
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={PAGINATION_CHOICES}
          count={allOperatorsCount}
          rowsPerPage={perPage}
          page={page}
          onPageChange={(_, page) => onChangePage(page)}
          onRowsPerPageChange={(e) => onChangePerPage(Number(e.target.value))}
        />
      </Paper>
    </Box>
  );
};
