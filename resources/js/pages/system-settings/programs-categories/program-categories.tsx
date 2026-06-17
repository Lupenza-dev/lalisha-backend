import ResourceManager, { type SystemSettingItem } from '@/components/system-settings/ResourceManager';

interface Props {
    items: SystemSettingItem[];
}

export default function ProgramCategories({ items }: Props) {
    return (
        <ResourceManager
            title="Program Categories"
            singular="Program Category"
            resource="program-categories"
            items={items}
        />
    );
}
