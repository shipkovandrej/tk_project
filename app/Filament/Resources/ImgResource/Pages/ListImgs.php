<?php

namespace App\Filament\Resources\ImgResource\Pages;

use App\Filament\Resources\ImgResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListImgs extends ListRecords
{
    protected static string $resource = ImgResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
