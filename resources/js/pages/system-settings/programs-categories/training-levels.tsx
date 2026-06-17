import ResourceManager, { type SystemSettingItem } from '@/components/system-settings/ResourceManager';

interface Props {
    items: SystemSettingItem[];
}

export default function TrainingLevels({ items }: Props) {
    return (
        <ResourceManager
            title="Training Levels"
            singular="Training Level"
            resource="training-levels"
            items={items}
        />
    );
}
