import { DataContainerRow } from "@/types/data";
import { Table } from "@mantine/core";

export const SimpleTable = ({ data }: { data: DataContainerRow[] }) => {
    const availableFields = data.length > 0 ? Object.keys(data[0]) : [];
    const headerRow = (
        <Table.Tr>
            {availableFields.map((field) => (
                <Table.Th key={field}>{field}</Table.Th>
            ))}
        </Table.Tr>
    );
    const rows = data.map((row, index) => (
        <Table.Tr key={index}>
            {availableFields.map((field) => (
                <Table.Td key={field}>{String(row[field])}</Table.Td>
            ))}
        </Table.Tr>
    ));
    return (
        <Table>
            <Table.Thead>{headerRow}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>


    )
}