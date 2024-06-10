<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TruckResource\Pages;
use App\Filament\Resources\TruckResource\RelationManagers;
use App\Models\Img;
use App\Models\Trailer;
use App\Models\Truck;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TruckResource extends Resource
{
    protected static ?string $model = Truck::class;

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
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->label('Название')
                    ->maxLength(255),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('pre_text_1')
                    ->required()
                    ->label('Текст 1')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('pre_text_2')
                    ->required()
                    ->label('Текст 2')
                    ->columnSpanFull(),
                Forms\Components\Select::make('img_id')
                    ->label('Картинка')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck( 'id', 'id')),

                Forms\Components\Select::make('mini_img_id')
                    ->label('Мини картинка')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck( 'id', 'id')),
                Forms\Components\Select::make('spec_img_id')
                    ->label('Картинка вида')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck( 'id', 'id')),
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
                Tables\Columns\TextColumn::make('slug')
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
                Tables\Columns\TextColumn::make('img_id')
                    ->numeric()
                    ->label('Картинка')
                    ->sortable(),
                Tables\Columns\TextColumn::make('mini_img_id')
                    ->numeric()
                    ->label('Мини картинка')
                    ->sortable(),
                Tables\Columns\TextColumn::make('spec_img_id')
                    ->numeric()
                    ->label('Картинка вида')
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
            'index' => Pages\ListTrucks::route('/'),
            'create' => Pages\CreateTruck::route('/create'),
            'edit' => Pages\EditTruck::route('/{record}/edit'),
        ];
    }
}
