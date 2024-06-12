<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SpecResource\Pages;
use App\Filament\Resources\SpecResource\RelationManagers;
use App\Models\Img;
use App\Models\Parameter;
use App\Models\Spec;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SpecResource extends Resource
{
    protected static ?string $model = Spec::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('id')
                    ->numeric()
                    ->disabled()
                    ->placeholder('Для получения id записи, её сперва нужно создать')
                    ->default(request()->route()->parameter('record'))
                    ->label('id'),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->label('Название')
                    ->maxLength(255),
                Select::make('parameter_id')
                    ->placeholder('Выберите номер характиристики')
                    ->required()
                    ->preload()
                    ->native(false)
                    ->options(Parameter::all()->pluck('id', 'id'))
                    ->label('Номер характеристики'),
                Select::make('truck')
                    ->placeholder('Выберите вид машины')
                    ->preload()
                    ->required()
                    ->native(false)
                    ->relationship('truck', 'name')
                    ->label('Вид машины'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->label('Название')
                    ->searchable(),
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
                Tables\Columns\TextColumn::make('parameter_id')
                    ->label('Характеристики')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('truck.name')
                ->label('Вид машины'),
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
            'index' => Pages\ListSpecs::route('/'),
            'create' => Pages\CreateSpec::route('/create'),
            'edit' => Pages\EditSpec::route('/{record}/edit'),
        ];
    }
}
