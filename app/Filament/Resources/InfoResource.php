<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InfoResource\Pages;
use App\Filament\Resources\InfoResource\RelationManagers;
use App\Models\Info;
use Filament\Forms;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class InfoResource extends Resource
{
    protected static ?string $model = Info::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('id')
                    ->numeric()
                    ->disabled()
                    ->default(request()->route()->parameter('record'))
                    ->placeholder('Для получения id записи, её сперва нужно создать')
                    ->label('id'),
                TextInput::make('name')
                    ->required()
                    ->label('Название')
                    ->maxLength(255),
                TextInput::make('slug')
                    ->unique()
                    ->required()
                    ->maxLength(255),
                RichEditor::make('content')
                    ->required()
                    ->label('Содержание')
                    ->disableToolbarButtons([
                        'attachFiles',
                        'codeBlock',
                    ])

                    ->columnSpanFull(),
                Select::make('img_id')
                    ->label('Картинка')
                    ->required()
                    ->native(false)
                    ->placeholder('Выберите картинку')
                    ->relationship('mini_img', 'id'),
                Select::make('mini_img_id')
                    ->label('Мини картинка')
                    ->required()
                    ->native(false)
                    ->placeholder('Выберите картинку')
                    ->relationship('mini_img', 'id'),
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
            'index' => Pages\ListInfos::route('/'),
            'create' => Pages\CreateInfo::route('/create'),
            'edit' => Pages\EditInfo::route('/{record}/edit'),
        ];
    }
}
