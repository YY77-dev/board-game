import { Button, Group, Modal, Text } from '@mantine/core';

type ResetModalProps = {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ResetModal({ opened, onClose, onConfirm }: ResetModalProps) {
    return (
        <Modal opened={opened} onClose={onClose} title="ゲームをリセットしますか？" centered>
            <Text size="sm">この操作は取り消せません</Text>
            <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={onClose}>
                    キャンセル
                </Button>
                <Button color="red" onClick={onConfirm}>
                    リセット
                </Button>
            </Group>
        </Modal>
    );
}
