<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CargoResource\Pages;
use App\Filament\Resources\CargoResource\RelationManagers;
use App\Models\Cargo;
use App\Models\Img;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CargoResource extends Resource
{
    protected static ?string $model = Cargo::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('id')
                    ->numeric()
                    ->readOnly()
                    ->default(request()->route()->parameter('record'))
                    ->label('id'),

                TextInput::make('name')
                    ->required()
                    ->label('Название')
                    ->maxLength(255),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255),

                Textarea::make('card')
                    ->required()
                    ->label('Текст в карточке')
                    ->columnSpanFull(),

                Textarea::make('pre_text_1')
                    ->required()
                    ->label('Текст 1')
                    ->columnSpanFull(),

                Textarea::make('pre_text_2')
                    ->required()
                    ->label('Текст 2')
                    ->columnSpanFull(),

                TextInput::make('price')
                    ->required()
                    ->label('Цена')
                    ->numeric()
                    ->prefix('₽'),

                Select::make('questions')
                    ->placeholder('Выберите часто задаваемые вопросы')
                    ->required()
                    ->multiple()
                    ->preload()
                    ->relationship('questions', 'name')
                    ->label('Часто задаваемые вопросы'),

                Select::make('img_id')
                    ->label('Картинка')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck( 'id', 'id')),

                Select::make('mini_img_id')
                    ->label('Мини картинка')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck( 'id', 'id')),

                Select::make('mini_img_id')
                    ->label('Лого')
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
                    ->searchable(),

                Tables\Columns\TextColumn::make('price')
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
                Tables\Columns\TextColumn::make('img_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('mini_img_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('logo_img_id')
                    ->numeric()
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
            'index' => Pages\ListCargos::route('/'),
            'create' => Pages\CreateCargo::route('/create'),
            'edit' => Pages\EditCargo::route('/{record}/edit'),
        ];
    }
}
