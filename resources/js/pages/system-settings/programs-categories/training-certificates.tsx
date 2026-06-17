import ResourceManager, { type SystemSettingItem } from '@/components/system-settings/ResourceManager';

interface Props {
    items: SystemSettingItem[];
}

export default function TrainingCertificates({ items }: Props) {
    return (
        <ResourceManager
            title="Training Certificates"
            singular="Training Certificate"
            resource="training-certificates"
            items={items}
        />
    );
}
