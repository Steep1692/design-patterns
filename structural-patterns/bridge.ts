// Adapter makes things work after they're designed;
// Bridge makes them work before they are

// Usage in mundane:
// – There is App 1
// – There is App 2
// – Bridge acts as an API layer of App2 for App1, if needed
// – Bridge acts as an API layer of App1 for App2, if needed


type SearchAppParams = {
  limit?: number,
  currentPageIndex?: number,
}

type SearchAppItemsData = {
  items: [],
  total: number,
}

// Abstraction interface
interface SearchApp {
  getCurrentPageIndex(): number;
  updatePagination(params: SearchAppParams): void;
  updateSorts(): void;
  updateFilters(): void;
  updateItems(data: SearchAppItemsData): void;
}

// Implementor interface
interface SearchAppImplementation {
  currentPageIndex: number
  updateCurrentPageIndex(index: number): void;
  updateItemsLimit(limit: number): void;
  updateSorts(): void;
  updateFilters(): void;
  updateItems(items: []): void;
  updateTotalItemsCount(total: number): void;
}

// Concrete implementor
class SeparatedSearchApp implements SearchAppImplementation {
  currentPageIndex = 0;

  updateCurrentPageIndex(index: number) {
    this.currentPageIndex = index;
  }

  updateItemsLimit(limit: number) {
    // Implementation specific to SeparatedSearchApp
  }

  updateSorts() {
    // Implementation specific to SeparatedSearchApp
  }

  updateFilters() {
    // Implementation specific to SeparatedSearchApp
  }

  updateItems(items: []) {
    // Implementation specific to SeparatedSearchApp
  }

  updateTotalItemsCount(total: number) {
    // Implementation specific to SeparatedSearchApp
  }
}

// Refined Abstraction
class SearchAppBridge implements SearchApp {
  constructor(
    private searchAppImplementation: SearchAppImplementation
  ) {}

  getCurrentPageIndex(): number {
    return this.searchAppImplementation.currentPageIndex;
  }

  updatePagination({ currentPageIndex, limit }: SearchAppParams) {
    this.searchAppImplementation.updateCurrentPageIndex(currentPageIndex);
    this.searchAppImplementation.updateItemsLimit(limit);
  }

  updateSorts() {
    this.searchAppImplementation.updateSorts();
  }

  updateFilters() {
    this.searchAppImplementation.updateFilters();
  }

  updateItems({ items, total }: SearchAppItemsData) {
    this.searchAppImplementation.updateItems(items);
    this.searchAppImplementation.updateTotalItemsCount(total);
  }
}

// Client code
class MainApp {
  constructor(private searchApp: SearchApp) {}

  handleClickPrevPage() {
    const currentPageIndex = this.searchApp.getCurrentPageIndex();
    this.searchApp.updatePagination({ currentPageIndex: currentPageIndex - 1 });
  }

  handleClickNextPage() {
    const currentPageIndex = this.searchApp.getCurrentPageIndex();
    this.searchApp.updatePagination({ currentPageIndex: currentPageIndex + 1 });
  }
}

// Usage
const separatedSearchApp = new SeparatedSearchApp();
const searchAppBridge = new SearchAppBridge(separatedSearchApp);
const mainApp = new MainApp(searchAppBridge);

mainApp.handleClickNextPage();
mainApp.handleClickPrevPage();
