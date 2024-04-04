<?php

use App\Community\Enums\UserGameListType;
use App\Models\System;
use App\Enums\Permissions;
?>

@props([
    'gameId' => 0,
    'gameTitle' => 'Unknown Game',
    'consoleId' => 0,
    'consoleName' => 'Unknown Console',
    'includeAddToListButton' => false,
])

<?php
$addToListType = UserGameListType::Play;
$iconUrl = getSystemIconUrl($consoleId);
?>

<h1 class="text-h3">
    <span class="block mb-1">
        <x-game-title :rawTitle="$gameTitle" />
    </span>

    <div class="flex justify-between">
        <div class="flex items-center gap-x-1">
            <img src="{{ $iconUrl }}" width="24" height="24" alt="Console icon">
            <span class="block text-sm tracking-tighter">{{ $consoleName }}</span>
        </div>

        @php
            $user = $includeAddToListButton ? auth()->user() : null;
        @endphp
        @if ($user?->getAttribute('Permissions') >= Permissions::Registered && System::isGameSystem($consoleId))
            <x-game.add-to-list :gameId="$gameId" :type="$addToListType" />
        @endif
    </div>
</h1>