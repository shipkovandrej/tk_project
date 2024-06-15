<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TruckResource\Pages;
use App\Filament\Resources\TruckResource\RelationManagers;
use App\Models\Img;
use App\Models\Trailer;
use App\Models\Truck;
use Filament\Forms;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Components\Group;
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

                TextInput::make('id')
                    ->numeric()
                    ->disabled()
                    ->placeholder('Для получения id записи, её сперва нужно создать')
                    ->default(request()->route()->parameter('record'))
                    ->label('id'),
                TextInput::make('name')
                    ->required()
                    ->label('Название')
                    ->maxLength(255),
                TextInput::make('slug')
                    ->unique()
                    ->required()
                    ->maxLength(255),
                RichEditor::make('pre_text_1')
                    ->required()
                    ->label('Текст 1')
                    ->disableToolbarButtons([
                        'attachFiles',
                        'codeBlock',
                    ])
                    ->columnSpanFull(),
                RichEditor::make('pre_text_2')
                    ->required()
                    ->label('Текст 2')
                    ->disableToolbarButtons([
                        'attachFiles',
                        'codeBlock',
                    ])
                    ->columnSpanFull(),


                Select::make('types')
                    ->placeholder('Выберите тип кузова')
                    ->multiple()
                    ->preload()
                    ->relationship('types', 'name')
                    ->label('Типы кузова'),

                Select::make('methods')
                    ->placeholder('Выберите способ погрузки')
                    ->multiple()
                    ->preload()
                    ->relationship('methods', 'name')
                    ->label('Способ погрузки'),

                Select::make('img_id')
                    ->label('Картинка')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck('id', 'id')),

                Select::make('mini_img_id')
                    ->label('Мини картинка')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck('id', 'id')),
                Select::make('spec_img_id')
                    ->label('Картинка вида')
                    ->required()
                    ->placeholder('Картинка обязательна')
                    ->native(false)
                    ->options(Img::all()->pluck('id', 'id')),

                Select::make('questions')
                    ->placeholder('Выберите часто задаваемые вопросы')
                    ->required()
                    ->multiple()
                    ->preload()
                    ->relationship('questions', 'name')
                    ->label('Часто задаваемые вопросы'),

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
