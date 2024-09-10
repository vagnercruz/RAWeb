import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { GameAvatar } from '@/common/components/GameAvatar';
import { SystemChip } from '@/common/components/SystemChip/SystemChip';
import { WeightedPointsContainer } from '@/common/components/WeightedPointsContainer';

import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTableRowActions } from './DataTableRowActions';

dayjs.extend(utc);

export const columns: ColumnDef<App.Community.Data.UserGameListEntry>[] = [
  {
    id: 'title',
    accessorKey: 'game',
    meta: { label: 'Title' },
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      if (!row.original.game) {
        return null;
      }

      return (
        <div className="max-w-fit">
          <div className="max-w-[400px]">
            <GameAvatar {...row.original.game} size={32} />
          </div>
        </div>
      );
    },
  },
  {
    id: 'system',
    accessorKey: 'game',
    meta: { label: 'System' },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      if (!row.original.game?.system) {
        return null;
      }

      return <SystemChip system={row.original.game.system} />;
    },
  },
  {
    id: 'achievementsPublished',
    accessorKey: 'game',
    meta: { label: 'Achievements', align: 'right' },
    header: ({ column }) => <DataTableColumnHeader column={column} sortLabelVariant="more-less" />,
    cell: ({ row }) => {
      const achievementsPublished = row.original.game?.achievementsPublished ?? 0;

      return (
        <p className={achievementsPublished === 0 ? 'text-muted' : ''}>{achievementsPublished}</p>
      );
    },
  },
  {
    id: 'pointsTotal',
    accessorKey: 'game',
    meta: { label: 'Points', align: 'right' },
    header: ({ column }) => <DataTableColumnHeader column={column} sortLabelVariant="more-less" />,
    cell: ({ row }) => {
      const pointsTotal = row.original.game?.pointsTotal ?? 0;
      const pointsWeighted = row.original.game?.pointsWeighted ?? 0;

      if (pointsTotal === 0) {
        return <p className="text-muted">{pointsTotal}</p>;
      }

      return (
        <p className="whitespace-nowrap">
          {pointsTotal.toLocaleString()}{' '}
          <WeightedPointsContainer>({pointsWeighted.toLocaleString()})</WeightedPointsContainer>
        </p>
      );
    },
  },
  {
    id: 'retroRatio',
    accessorKey: 'game',
    meta: { label: 'Rarity', align: 'right' },
    header: ({ column }) => <DataTableColumnHeader column={column} sortLabelVariant="more-less" />,
    cell: ({ row }) => {
      const pointsTotal = row.original.game?.pointsTotal ?? 0;

      if (pointsTotal === 0) {
        return <p className="text-muted italic">none</p>;
      }

      const pointsWeighted = row.original.game?.pointsWeighted ?? 0;

      const result = pointsWeighted / pointsTotal;

      return <p>&times;{(Math.round((result + Number.EPSILON) * 100) / 100).toFixed(2)}</p>;
    },
  },
  {
    id: 'lastUpdated',
    accessorKey: 'game',
    meta: { label: 'Last Updated' },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const date = row.original.game?.lastUpdated ?? new Date();

      return <p>{dayjs.utc(date).format('MMM DD, YYYY')}</p>;
    },
  },
  {
    id: 'releasedAt',
    accessorKey: 'game',
    meta: { label: 'Release Date' },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const date = row.original.game?.releasedAt ?? null;
      const granularity = row.original.game?.releasedAtGranularity ?? 'day';

      if (!date) {
        return <p className="text-muted italic">unknown</p>;
      }

      let formattedDate;
      if (granularity === 'day') {
        formattedDate = dayjs.utc(date).format('MMM DD, YYYY');
      } else if (granularity === 'month') {
        formattedDate = dayjs.utc(date).format('MMM YYYY');
      } else {
        formattedDate = dayjs.utc(date).format('YYYY');
      }

      return <p>{formattedDate}</p>;
    },
  },
  {
    id: 'numLeaderboardsVisible',
    accessorKey: 'game',
    meta: { label: 'Leaderboards', align: 'right' },
    header: ({ column }) => <DataTableColumnHeader column={column} sortLabelVariant="more-less" />,
    cell: ({ row }) => {
      const numLeaderboardsVisible = row.original.game?.numLeaderboardsVisible ?? 0;

      return (
        <p className={numLeaderboardsVisible === 0 ? 'text-muted' : ''}>{numLeaderboardsVisible}</p>
      );
    },
  },
  {
    id: 'numUnresolvedTickets',
    accessorKey: 'game',
    meta: { label: 'Open Tickets', align: 'right' },
    header: ({ column }) => <DataTableColumnHeader column={column} sortLabelVariant="more-less" />,
    cell: ({ row }) => {
      const numUnresolvedTickets = row.original.game?.numUnresolvedTickets ?? 0;
      const gameId = row.original.game?.id ?? 0;

      return (
        <a
          href={route('game.tickets', { game: gameId, 'filter[achievement]': 'core' })}
          className={numUnresolvedTickets === 0 ? 'text-muted' : ''}
        >
          {numUnresolvedTickets}
        </a>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
