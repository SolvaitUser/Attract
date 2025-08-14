import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const UserAccessTable: React.FC = () => {
  const { t } = useLanguage();
  
  const users = [
    {
      id: 1,
      name: 'Ahmed Al-Saud',
      email: 'ahmed@wise.sa',
      role: 'admin',
      department: 'HR',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=6',
      lastActive: '2023-08-14',
    },
    {
      id: 2,
      name: 'Sara Al-Qahtani',
      email: 'sara@wise.sa',
      role: 'manager',
      department: 'HR',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=7',
      lastActive: '2023-08-15',
    },
    {
      id: 3,
      name: 'Khalid Hassan',
      email: 'khalid@wise.sa',
      role: 'manager',
      department: 'IT',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=8',
      lastActive: '2023-08-15',
    },
    {
      id: 4,
      name: 'John Miller',
      email: 'john@wise.sa',
      role: 'manager',
      department: 'Finance',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=9',
      lastActive: '2023-08-13',
    },
    {
      id: 5,
      name: 'Fatima Al-Otaibi',
      email: 'fatima@wise.sa',
      role: 'viewer',
      department: 'HR',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=10',
      lastActive: '2023-08-14',
    },
  ];
  
  const getRoleChip = (role: string) => {
    const colorMap: Record<string, any> = {
      admin: 'danger',
      manager: 'primary',
      editor: 'success',
      viewer: 'default',
    };
    
    return (
      <Chip 
        color={colorMap[role] || 'default'} 
        size="sm"
        variant="flat"
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Chip>
    );
  };
  
  return (
    <Table 
      aria-label={t('userAccessTable')}
      removeWrapper
      classNames={{
        th: "bg-default-100",
      }}
    >
      <TableHeader>
        <TableColumn>{t('user')}</TableColumn>
        <TableColumn>{t('role')}</TableColumn>
        <TableColumn>{t('department')}</TableColumn>
        <TableColumn>{t('lastActive')}</TableColumn>
        <TableColumn className="text-right">{t('actions')}</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-b border-default-200">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-default-500 text-xs">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{getRoleChip(user.role)}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>{user.lastActive}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem startContent={<Icon icon="lucide:pencil" />}>
                      {t('editAccess')}
                    </DropdownItem>
                    <DropdownItem startContent={<Icon icon="lucide:key" />}>
                      {t('changeRole')}
                    </DropdownItem>
                    <DropdownItem 
                      startContent={<Icon icon="lucide:trash" />}
                      className="text-danger"
                    >
                      {t('removeAccess')}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};