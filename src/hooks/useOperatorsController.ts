import { useCallback, useMemo, useState } from 'react';
import type { Operator, OperatorAddon } from '../models';
import { useSearchParams } from 'react-router-dom';
import { orderBy } from 'lodash';

type Order = 'asc' | 'desc';

interface UseOperatorsControllerParams {
  operators: Operator[];
  operatorAddons: OperatorAddon[];
}

export const useOperatorsController = (params: UseOperatorsControllerParams) => {
  const { operators, operatorAddons } = params;

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const urlSearchFilter = urlSearchParams.get('filter') || '';
  const urlSearchPage = Number(urlSearchParams.get('page')) || 0;
  const urlSearchPerPage = Number(urlSearchParams.get('perPage')) || 5;
  const urlSearchOrder = urlSearchParams.get('order') || 'asc';
  const urlSearchSortBy = urlSearchParams.get('sortBy');

  const initialQueryParams = {
    filter: urlSearchFilter,
    page: urlSearchPage,
    perPage: urlSearchPerPage,
    sortBy: urlSearchSortBy,
    order: urlSearchOrder as Order
  };

  const [queryParams, setQueryParams] = useState(initialQueryParams);

  const { filter, page, perPage, sortBy, order } = queryParams;

  const setSearchParams = useCallback(
    (name: string, value: string | number) => {
      setQueryParams((prev) => ({ ...prev, [name]: value }));

      urlSearchParams.set(name, String(value));
      setUrlSearchParams(urlSearchParams);
    },
    [setUrlSearchParams, urlSearchParams]
  );

  const onChangePage = useCallback(
    (value: number) => {
      setSearchParams('page', value);
    },
    [setSearchParams]
  );

  const onChangePerPage = useCallback(
    (value: number) => {
      setSearchParams('perPage', value);
    },
    [setSearchParams]
  );

  const onChangeFilter = useCallback(
    (value: string) => {
      setSearchParams('filter', value);
    },
    [setSearchParams]
  );

  const onChangeSort = useCallback(
    (value: string) => {
      const isAsc = sortBy === value && order === 'asc';

      const newOrder = isAsc ? 'desc' : 'asc';

      setQueryParams((prev) => ({ ...prev, order: newOrder, sortBy: value }));

      urlSearchParams.set('order', newOrder);
      urlSearchParams.set('sortBy', value);

      setUrlSearchParams(urlSearchParams);
    },
    [order, setUrlSearchParams, sortBy, urlSearchParams]
  );

  const operatorAddonFields = useMemo(() => {
    return operatorAddons.length ? Object.keys(operatorAddons[0]) : [];
  }, [operatorAddons]);

  const mergedOperators = useMemo(() => {
    const operatorAddonsById: Record<string, OperatorAddon> = {};

    operatorAddons.forEach((addon) => {
      operatorAddonsById[addon.id] = addon;
    });

    return operators.map((operator) => ({ ...operator, ...operatorAddonsById[operator.id] }));
  }, [operatorAddons, operators]);

  const filteredOperators = useMemo(() => {
    return mergedOperators.filter((operator) => {
      const allSearchValues = Object.values(operator).filter((value) => typeof value === 'string');

      return allSearchValues.some((searchValue) =>
        searchValue.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }, [filter, mergedOperators]);

  const sortedOperators = useMemo(() => {
    if (!sortBy) {
      return filteredOperators;
    } else {
      return orderBy(filteredOperators, sortBy, order as Order);
    }
  }, [filteredOperators, order, sortBy]);

  const finalOperators = useMemo(
    () => sortedOperators.slice(page * perPage, page * perPage + perPage),
    [page, perPage, sortedOperators]
  );

  return {
    finalOperators,
    onChangeFilter,
    onChangePage,
    onChangePerPage,
    onChangeSort,
    operatorAddonFields,
    filteredOperatorsCount: filteredOperators.length,
    ...queryParams
  };
};
