<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TrailerResource\Pages;
use App\Filament\Resources\TrailerResource\RelationManagers;
use App\Models\Trailer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TrailerResource extends Resource
{
    protected static ?string $model = Trailer::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';



    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('id')
                    ->numeric()
                    ->disabled()
                    ->default(request()->route()->parameter('record'))
                    ->placeholder('Для получения id записи, её сперва нужно создать')
                    ->label('id'),
                Forms\Components\TextInput::make('length')
                    ->required()
                    ->label('Длина')
                    ->numeric(),
                Forms\Components\TextInput::make('width')
                    ->required()
                    ->label('Ширина')
                    ->numeric(),
                Forms\Components\TextInput::make('height')
                    ->required()
                    ->label('Высота')
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable(),
                Tables\Columns\TextColumn::make('length')
                    ->numeric()
                    ->label('Длина')
                    ->sortable(),
                Tables\Columns\TextColumn::make('width')
                    ->numeric()
                    ->label('Ширина')
                    ->sortable(),
                Tables\Columns\TextColumn::make('height')
                    ->numeric()
                    ->label('Высота')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTrailers::route('/'),
            'create' => Pages\CreateTrailer::route('/create'),
            'edit' => Pages\EditTrailer::route('/{record}/edit'),
        ];
    }
}
