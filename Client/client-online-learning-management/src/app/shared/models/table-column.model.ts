export interface TableColumn {
  key: string;          // property name from the data object
  header: string;       // display name for the column header
  type: 'text' | 'number' | 'date' | 'currency' | 'boolean' | 'custom';  // data type for formatting
  format?: string;      // optional format string (e.g., date format)
  width?: string;       // optional width specification
  customFormatter?: (value: any) => string; // optional custom formatter function
}
