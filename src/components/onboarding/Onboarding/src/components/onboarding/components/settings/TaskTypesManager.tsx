import React from 'react';
import { Card, CardBody, Input, Chip, Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const TaskTypesManager: React.FC = () => {
  const { t } = useLanguage();
  
  const taskTypes = [
    {
      id: 'admin',
      name: t('admin'),
      color: 'primary',
      description: t('adminTasksDescription'),
      editable: false,
    },
    {
      id: 'compliance',
      name: t('compliance'),
      color: 'danger',
      description: t('complianceTasksDescription'),
      editable: false,
    },
    {
      id: 'training',
      name: t('training'),
      color: 'success',
      description: t('trainingTasksDescription'),
      editable: false,
    },
    {
      id: 'tech',
      name: t('techSetup'),
      color: 'secondary',
      description: t('techSetupTasksDescription'),
      editable: false,
    },
    {
      id: 'orientation',
      name: t('orientation'),
      color: 'warning',
      description: t('orientationTasksDescription'),
      editable: false,
    },
    {
      id: 'custom1',
      name: t('securityTraining'),
      color: 'default',
      description: t('securityTrainingDescription'),
      editable: true,
    },
  ];
  
  return (
    <Card className="bg-default-50">
      <CardBody className="p-0">
        <table className="min-w-full">
          <thead>
            <tr className="bg-default-100">
              <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                {t('taskType')}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                {t('color')}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                {t('description')}
              </th>
              <th className="py-3 px-4 text-right text-xs font-medium text-default-600 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {taskTypes.map((type) => (
              <tr key={type.id} className="border-t border-default-200">
                <td className="py-3 px-4">
                  <Input 
                    value={type.name}
                    variant="bordered"
                    isReadOnly={!type.editable}
                    size="sm"
                    className="max-w-[200px]"
                  />
                </td>
                <td className="py-3 px-4">
                  <Chip 
                    color={type.color as any}
                    variant="flat"
                  >
                    {type.color}
                  </Chip>
                </td>
                <td className="py-3 px-4">
                  <Input 
                    value={type.description}
                    variant="bordered"
                    isReadOnly={!type.editable}
                    size="sm"
                    className="w-full"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-1">
                    {type.editable ? (
                      <>
                        <Tooltip content={t('save')}>
                          <Button isIconOnly size="sm" variant="flat" color="success">
                            <Icon icon="lucide:check" className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content={t('delete')}>
                          <Button isIconOnly size="sm" variant="flat" color="danger">
                            <Icon icon="lucide:trash" className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip content={t('systemDefault')}>
                        <Button isIconOnly size="sm" variant="flat" isDisabled>
                          <Icon icon="lucide:lock" className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};