<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ParameterResource\Pages;
use App\Filament\Resources\ParameterResource\RelationManagers;
use App\Models\Parameter;
use App\Models\Trailer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ParameterResource extends Resource
{
    protected static ?string $model = Parameter::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('id')
                    ->numeric()
                    ->disabled()
                    ->default(request()->route()->parameter('record'))
                    ->label('id'),
                Forms\Components\TextInput::make('payload')
                    ->required()
                    ->numeric()
                    ->label('Грузоподъемность'),
                Forms\Components\TextInput::make('length')
                    ->required()
                    ->numeric()
                    ->label('Длина'),
                Forms\Components\TextInput::make('width')
                    ->required()
                    ->numeric()
                    ->label('Ширина'),
                Forms\Components\TextInput::make('height')
                    ->required()
                    ->numeric()
                    ->label('Высота'),
                Forms\Components\TextInput::make('volume')
                    ->numeric()
                    ->label('Объем'),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix("₽")
                    ->label('Цена'),
                Forms\Components\TextInput::make('psp')
                    ->numeric()
                    ->label('Палетто-место'),
                Forms\Components\Select::make('trailer_id')
                    ->label('Прицеп')
                    ->native(true)
                    ->placeholder('Без прицепа')
                    ->options(Trailer::all()->pluck( 'id', 'id'))

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable(),
                Tables\Columns\TextColumn::make('payload')
                    ->numeric()
                    ->label('Грузпоподъемность')
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
                Tables\Columns\TextColumn::make('volume')
                    ->numeric()
                    ->label('Объем')
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')

                    ->label('Цена')
                    ->sortable(),
                Tables\Columns\TextColumn::make('psp')
                    ->numeric()
                    ->label('Палетто-место')
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
                Tables\Columns\TextColumn::make('trailer_id')
                    ->numeric()
                    ->label('Прицеп')
                    ->sortable(),
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
            'index' => Pages\ListParameters::route('/'),
            'create' => Pages\CreateParameter::route('/create'),
            'edit' => Pages\EditParameter::route('/{record}/edit'),
        ];
    }
}
