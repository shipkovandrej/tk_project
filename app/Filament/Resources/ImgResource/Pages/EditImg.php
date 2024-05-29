<?php

namespace App\Filament\Resources\ImgResource\Pages;

use App\Filament\Resources\ImgResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditImg extends EditRecord
{
    protected static string $resource = ImgResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
