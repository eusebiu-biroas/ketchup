import { GenericFilter } from '../../utils/filters/filters-declarations';
import { KupState } from '../kup-state/kup-state';

import {
    GroupObject,
    SortObject,
    GroupLabelDisplayMode,
    TotalsMap,
} from './kup-data-table-declarations';

export class KupDataTableState implements KupState {
    filters: GenericFilter = {};
    expandGroups = false;
    groupLabelDisplay = GroupLabelDisplayMode.BOTH;
    density: string = 'small';
    enableSortableColumns: boolean = false;
    forceOneLine: boolean = false;
    globalFilter = false;
    globalFilterValue = '';
    groups: Array<GroupObject> = [];
    headerIsPersistent = true;
    lazyLoadRows = false;
    loadMoreLimit: number = 1000;
    multiSelection = false;
    rowsPerPage = 10;
    showFilters = false;
    showGroups = false;
    showHeader = true;
    showLoadMore: boolean = false;
    sortEnabled = true;
    sort: Array<SortObject> = [];
    sortableColumnsMutateData: boolean = true;
    pageSelected: number = 1;
    selectRow: number;
    selectRowsById: string;
    dragEnabled: boolean = false;
    dropEnabled: boolean = false;
    showFooter: boolean = false;
    totals: TotalsMap;

    public toDebugString() {
        // TODO
        return 'state';
    }
}
