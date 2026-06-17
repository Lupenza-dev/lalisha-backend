import ResourceManager, { type SystemSettingItem } from '@/components/system-settings/ResourceManager';

interface Props {
    items: SystemSettingItem[];
}

export default function ProgramTypes({ items }: Props) {
    return (
        <ResourceManager
            title="Program Types"
            singular="Program Type"
            resource="program-types"
            items={items}
        />
    );
}
